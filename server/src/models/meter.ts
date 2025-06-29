import { Point } from "./geo";
export class Meter {
  static withinRange (center:Point, radius:number){
    console.log(`Meter::withinRange`, center, radius)
  }
}