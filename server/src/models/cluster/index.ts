import type { Point } from "../geo";
const MAX_ITERATIONS = 50;

function randomBetween(min:number, max:number) {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

function calcMeanCentroid(dataSet:Array<Point>, start:number, end:number) {
  // needs work, dataset entry is a single point, not an array
  const n = end - start;
  let mean = {lat:0,lon:0};
  for (let i = start; i < end; i++) {
    mean.lat = mean.lat + dataSet[i].lat / n
    mean.lon= mean.lon + dataSet[i].lon / n
  }
  return mean;
}

function getRandomCentroidsNaiveSharding(dataset:Array<Point>, k:number): Array<Point> {
  // implementation of a variation of naive sharding centroid initialization method
  // (not using sums or sorting, just dividing into k shards and calc mean)
  // https://www.kdnuggets.com/2017/03/naive-sharding-centroid-initialization-method.html
  const numSamples = dataset.length;
  // Divide dataset into k shards:
  const step = Math.floor(numSamples / k);
  const centroids = [];
  for (let i = 0; i < k; i++) {
    const start = step * i;
    let end = step * (i + 1);
    if (i + 1 === k) {
      end = numSamples;
    }
    centroids.push(calcMeanCentroid(dataset, start, end));
  }
  return centroids;
}

function getRandomCentroids(dataset:Array<Point>, k:number): Array<Point> {
  // selects random points as centroids from the dataset
  const numSamples = dataset.length;
  const centroidsIndex = [];
  let index;
  while (centroidsIndex.length < k) {
    index = randomBetween(0, numSamples);
    if (centroidsIndex.indexOf(index) === -1) {
      centroidsIndex.push(index);
    }
  }

  const centroids = [];
  for (let i = 0; i < centroidsIndex.length; i++) {
    const key = centroidsIndex[i]
    const centroid = dataset[key];
    centroids.push({...centroid});
  }
  return centroids;
}

function compareCentroids(a:Point, b:Point) {

  if (a.lat !== b.lat || a.lon !== b.lon) {
    return false;
  }
  
  return true;
}

function shouldStop(oldCentroids:Array<Point> | undefined, centroids:Array<Point>, iterations:number) {
  if (iterations > MAX_ITERATIONS) {
    return true;
  }
  if (!oldCentroids || !oldCentroids.length) {
    return false;
  }
  let sameCount = true;
  for (let i = 0; i < centroids.length; i++) {
    if (!compareCentroids(centroids[i], oldCentroids[i])) {
      sameCount = false;
    }
  }
  return sameCount;
}

// Calculate Squared Euclidean Distance
export function getDistanceNaive(a:Point, b:Point) {
  const diff = {
    lat: Math.abs(a.lat - b.lat),
    lon: Math.abs(a.lon - b.lon)
  }
  return (diff.lat + diff.lon) / 2
}

interface LabelSet {
  [key: string] : {
    points: Array<Point>,
    centroid: Point
  }
}

// Returns a label for each piece of data in the dataset. 
function getLabels(dataSet:Array<Point>, centroids:Array<Point>):LabelSet {
  // prep data structure:
  const labels:LabelSet = {};
  for (let c = 0; c < centroids.length; c++) {
    labels[c] = {
      points: [],
      centroid: centroids[c],
    };
  }
  // For each element in the dataset, choose the closest centroid. 
  // Make that centroid the element's label.
  for (let i = 0; i < dataSet.length; i++) {
    const a = dataSet[i];
    let closestCentroid, closestCentroidIndex, prevDistance=Infinity;
    for (let j = 0; j < centroids.length; j++) {
      let centroid = centroids[j];
      if (j === 0) {
        closestCentroid = centroid;
        closestCentroidIndex = j;
        prevDistance = getDistanceNaive(a, closestCentroid);
      } else {
        // get distance:
        const distance = getDistanceNaive(a, centroid);
        
        if (distance < prevDistance) {
          prevDistance = distance;
          closestCentroid = centroid;
          closestCentroidIndex = j;
        }
      }
    }
    // add point to centroid labels:
    if(closestCentroidIndex){
      labels[closestCentroidIndex].points.push(a);
    }
  }
  return labels;
}

function getPointsMean(pointList:Array<Point>) {
  const n = pointList.length
  let mean = {lat:0,lon:0};
  for (let i = 0; i < n; i++) {
    mean.lat = mean.lat + pointList[i].lat / n
    mean.lon= mean.lon + pointList[i].lon / n
  }
  return mean;
}

function recalculateCentroids(dataSet:Array<Point>, labels:LabelSet, k:number) {
  // Each centroid is the geometric mean of the points that
  // have that centroid's label. Important: If a centroid is empty (no points have
  // that centroid's label) you should randomly re-initialize it.
  let newCentroid;
  const newCentroidList = [];
  for (const k in labels) {
    const centroidGroup = labels[k];
    if (centroidGroup.points.length > 0) {
      // find mean:
      newCentroid = getPointsMean(centroidGroup.points);
    } else {
      // get new random centroid
      newCentroid = getRandomCentroids(dataSet, 1)[0];
    }
    newCentroidList.push(newCentroid);
  }
  return newCentroidList;
}

function kmeans(dataset:Array<Point>, k:number, useNaiveSharding = true) {
  if (dataset.length && dataset.length > k) {
    // Initialize book keeping variables
    let iterations = 0;
    let oldCentroids, labels, centroids;

    // Initialize centroids randomly
    if (useNaiveSharding) {
      centroids = getRandomCentroidsNaiveSharding(dataset, k);
    } else {
      centroids = getRandomCentroids(dataset, k);
    }


    // Run the main k-means algorithm
    while (!shouldStop(oldCentroids, centroids, iterations)) {
      // Save old centroids for convergence test.
      oldCentroids =  [...centroids]
      iterations++;

      // Assign labels to each datapoint based on centroids
      labels = getLabels(dataset, centroids);
      centroids = recalculateCentroids(dataset, labels, k);
    }

    const clusters = [];
    for (let i = 0; i < k; i++) {
      labels && clusters.push(labels[i]);
    }
    const results = {
      clusters: clusters,
      centroids: centroids,
      iterations: iterations,
      converged: iterations <= MAX_ITERATIONS,
    };
    return results;
  } else {
    throw new Error('Invalid dataset');
  }
}

export default kmeans;