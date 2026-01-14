import { FineStrategy } from "./FineStrategy.js";

export class NoFineStrategy extends FineStrategy {
  computeFine() {
    return 0;
  }
}
