import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const stringLen = 100;

@Entity()
export class Images extends BaseEntity {
  /*
     
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imageID;
    private String imageUUID;
    private String projectUUID; // reference to project
    private double rot;
    private double posX;
    private double posY;
    private double height;
    private double width;
    private int zIndex = 1;
    private String imageURL;
    */

  @PrimaryGeneratedColumn()
  imageID?: number;

  @Column({
    length: stringLen,
  })
  imageUUID?: string;

  @Column({
    length: stringLen,
  })
  projectUUID?: string;

  @Column({
    length: stringLen,
  })
  imageURL?: string;
  rot?: number;
  posX?: number;
  posY?: number;
  height?: number;
  width?: number;
  zIndex?: number;
}
