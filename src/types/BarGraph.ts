type BarGraphSelection = {
  selection: string;
  color: string;
  count?: number;
}

export type BarGraphType = {
  type: string;
  title: string;
  maxSelectableCount: number;
  selections: BarGraphSelection[]
}
