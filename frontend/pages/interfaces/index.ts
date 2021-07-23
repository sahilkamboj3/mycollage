// page interfaces
export interface ImageInterface {
  id?: number;
  uuid: string;
  projectUUID?: string;
  url: string;
  xPos: number;
  yPos: number;
  rot: number;
  width: number;
  zIndex: number;
  height: number;
  leftBound?: number;
  rightBound?: number;
  topBound?: number;
  bottomBound?: number;
  screenWidth?: number;
  screenHeight?: number;
  updateBool?: boolean;
  updateCount?: number;
  updated?: boolean;
  setUpdated?: () => void;
}

export interface ImageStyleInterface {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
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
  uuid: string;
  userUUID: string;
  projectName: string;
}

// function interfaces
export interface UpdateImageFuncInterface {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  rot: number;
  zIndex: number;
}

// server side interfaces
export interface ServerSideCollageInterface {
  projectID: number;
  projectUUID: string;
  accountUUID: string;
  projectName: string;
}

export interface ServerSideImageInterface {
  imageID: number;
  imageUUID: string;
  projectUUID: string;
  rot: number;
  posX: number;
  posY: number;
  height: number;
  zindex: number;
  width: number;
  imageURL: string;
}
