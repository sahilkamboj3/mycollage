export interface ImageInterface {
  uuid: number;
  url: string;
  xPos: number;
  yPos: number;
  rot: number;
  width: number;
  height: number;
  leftBound: number;
  rightBound: number;
  topBound: number;
  bottomBound: number;
}

export interface FormInputInterface {
  id: string;
  inputLabel?: string;
  helperText?: string;
  isRequired?: boolean;
  inputType?: string;
  value: any;
  setValue: any;
}

export interface AccountInterface {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
}

export interface CollageInterface {
  id?: number;
  uuid: number;
  userUUID: number;
  projectName: string;
}
