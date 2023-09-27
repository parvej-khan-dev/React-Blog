const conf = {
appWriteUrl:String(import.meta.VITE_APPWRITE_URL),
appWriteProjectId:String(import.meta.VITE_APPWRITE_PROJECT_ID),
appWriteDatabaseId:String(import.meta.VITE_APPWRITE_DATABASE_ID),
appWriteCollectionId:String(import.meta.VITE_APPWRITE_COLLECTION_ID),
appWriteBucketId:String(import.meta.VITE_APPWRITE_BUCKET_ID)
}

export default conf;