import { Databases, Storage, ID, Query, Client } from "appwrite";
import conf from "../conf/conf";

export class Service {
  Client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, image, status, userId }) {
    try {
      return await  this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Error::create post", error);
    }
  }

  // update document 

  async updatePost(slug,{ title,  content, image, status }) {
    try {
       return  await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
        title,
        content,
        image,
        status
        
       }) 
    } catch (error) {
        console.log("Appwrite Error::update post", error);
    }}

    // delete document
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Error::delete post", error);
        }
        return false;
    }

    // get documents
    async getPostById(){
        try {
          return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug);  
        } catch (error) {
            console.log("Appwrite Error::get post", error);
        }
    }

    // list documents that status is Active 
    async listPosts(queries = [Query.equal('status', 'Active')]){
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite Error::list post", error)
            return false;
        }
    }


    // file upload services
    async uploadFile(file) {
        try {
             return await this.bucket.createFile(conf.appWriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite Error::upload file", error);
           return false;
        }
    }

    // delete file 

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appWriteBucketId,fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Error::delete file", error);
            return false;
        }
    }

    // get file preview 
     getFilePreview(fileId) {
        return  this.bucket.getFilePreview(conf.appWriteBucketId,fileId);
    }
  }


const service = new Service();
export default service;
