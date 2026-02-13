import React from 'react';
import { Outlet } from 'react-router-dom';


import '../../css/admin/adminPage.css';
import SideBar from './component/SideBarAdmin';
import HeaderAdmin from './component/HeaderAdmin';

const AdminLayout = () => {
  // const httpClient = (url, options = {}) => {

  //   const token = localStorage.getItem('authToken');
  //   if(!options.headers) options.headers = new Headers();
  //   options.headers.set('Authorization',`Bearer ${token}`);
  //   return fetchUtils.fetchJson(url, options);
  // }

  // const dataProvider = withLifecycleCallbacks(simpleRestProvider('http://localhost:8080/api',httpClient),[
  //   {
  //     resource:"products",
  //     beforeSave: async (params,dataProvider) =>{
  //       console.log("Params ",params);
  //       let requestBody = {
  //         ...params
  //       }
  //       let productResList = params?.productResources ?? [];
  //       const fileName = params?.thumbnail?.rawFile?.name?.replaceAll(' ','-');
  //       const formData = new FormData();
  //       formData.append("file",params?.thumbnail?.rawFile);
  //       formData.append("fileName",fileName);

  //       const thumbnailResponse = await fileUploadAPI(formData);
  //       requestBody.thumbnail = CDN_URL+"/"+fileName;

      
  //       const newProductResList = await Promise.all(productResList?.map(async (productResource)=>{
  //         const fileName = productResource?.url?.rawFile?.name?.replaceAll(' ','-');
  //         const formData = new FormData();
  //         formData.append("file",productResource?.url?.rawFile);
  //         formData.append("fileName",fileName);
  //         const fileUploadRes = await fileUploadAPI(formData);
  //         return {
  //           ...productResource,
  //           url: CDN_URL + "/" +fileName,
  //         };
  //       }));
  //       //console.log("Params ",params,fileName);
  //       const request = {
  //         ...requestBody,
  //         productResources: newProductResList
  //       }
  //       console.log("Request Body ",request);
  //       return request;
  //     }
  //   }
  // ]);

  return (
    <div className="admin">
      <SideBar/>
      <div className="admin_main">
        <HeaderAdmin />
        <div className="admin_content">
          {/* <Admin dataProvider={dataProvider} basename='/admin'> */}
            <Outlet/>
          {/* </Admin> */}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout;