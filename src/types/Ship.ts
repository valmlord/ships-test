export interface ShipIcon {
  large?: string;
  medium?: string;
  small?: string;
  default?: string;
}

export interface ShipType {
  name: string;
  title: string;
  icons: ShipIcon;
}

export interface Nation {
  name: string;
  title: string;
  color: string;
  icons: ShipIcon;
}

export interface Ship {
  title: string;
  description: string;
  icons: ShipIcon;
  level: number;
  type: ShipType;
  nation: Nation;
}
