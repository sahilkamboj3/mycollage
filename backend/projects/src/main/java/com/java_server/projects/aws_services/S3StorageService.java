package com.java_server.projects.aws_services;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.regions.Region;

import org.springframework.web.multipart.MultipartFile;

// use FileInputStream
public class S3StorageService {
    private final Region region = Region.US_WEST_1;
    private final String bucketName = "mycollageimages";
    // private final AmazonS3ClientBuilder builder =
    // AmazonS3ClientBuilder.standard().withRegion(Regions.US_WEST_1)
    // .withCredentials(new ProfileCredentialsProvider());
    private final AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard().withRegion(Regions.US_WEST_1)
            .withCredentials(DefaultAWSCredentialsProviderChain.getInstance());

    private final String BASE_AWS_IMAGE_URL = "https://s3.console.aws.amazon.com/s3/object/mycollageimages?region=us-west-1&prefix=";

    private static AmazonS3 s3;
    private static S3Presigner presigner;

    public S3StorageService() {
        s3 = this.buildS3Client();
        presigner = S3Presigner.builder().region(this.region).build();
    }

    /* Upload file to S3 */
    public String uploadFileObject(MultipartFile file, String userUUID, String collageUUID) throws IOException {
        InputStream stream = file.getInputStream();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        String key = userUUID + "/" + collageUUID + "/" + file.getOriginalFilename();

        PutObjectRequest request = new PutObjectRequest(this.bucketName, key, stream, metadata);
        s3.putObject(request);

        String imagePropertyURI = userUUID + "/" + collageUUID + "/" + file.getOriginalFilename().replace(' ', '+');
        String imageUrl = this.BASE_AWS_IMAGE_URL + imagePropertyURI;

        return imageUrl;
    }

    /* Get presigned url to get file from S3 */
    public String getPresignedUrl(String key) {
        GetObjectRequest getObjRequest = GetObjectRequest.builder().bucket(this.bucketName).key(key).build();
        GetObjectPresignRequest getObjPresignReqest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10)).getObjectRequest(getObjRequest).build();
        PresignedGetObjectRequest presignedGetObjRequest = presigner.presignGetObject(getObjPresignReqest);
        return presignedGetObjRequest.url().toString();
    }

    /* Build S3 client */
    public AmazonS3 buildS3Client() {
        return this.builder.build();
    }
}
