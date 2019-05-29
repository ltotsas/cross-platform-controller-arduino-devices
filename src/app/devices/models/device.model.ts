export class Device {
  public group: string;
  constructor(
    public name: string,
    public sName: string,
    public temp: number,
    public checked: boolean,
    public opened: boolean
  ) {}
}

export class FetchedDevice {
  constructor(
    public Names: any[],
    public SNames: any[],
    public Temps: any[],
    public Checked: any[],
    public Opened: any[]
  ) {}
}
