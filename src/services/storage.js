import { BlobServiceClient} from '@azure/storage-blob';

const random = (Math.random() + 1).toString(36).substring(7);
const containerName = 'a' + random;
const sasToken = 'sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciytfx&se=2022-07-26T06:54:28Z&st=2022-07-21T22:54:28Z&spr=https&sig=Jnq8rUdOgdVTqtvz1q37hYq83DWFEAy2OAmsU3wq1EM%3D';
const storageAccountName = 'a2zitss';
// </snippet_package>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return (!storageAccountName || !sasToken) ? false : true;
}
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
}
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (containerClient, file) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
}
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
        access: 'container',
    });

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
