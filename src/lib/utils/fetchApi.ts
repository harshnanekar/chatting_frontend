import type { ApiResponse } from "$lib/types/api";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { goto } from "$app/navigation";
export const fetchApi = async <T>(url : string , obj : object) : Promise<ApiResponse<T>> => {

    let urlHeader : RequestInit = {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(obj)
    }

    let response = await fetch(`${PUBLIC_BACKEND_URL}${url}`,urlHeader)

    let json;
    if(response.ok){
     json = await response.json();
    }else{
    goto("/error");
    }

    if(json != undefined){
    return { json };
    }else{
    return {json :{status:400,message:'Failed To Send Data !'}}
    }
}


export const verifyCookie = async <T>(url : string,token : string) : Promise<ApiResponse<T>> => {
   
  let urlHeader : RequestInit = {
        method : 'GET',
        headers : {
            'Accept':'application/json',
            'userToken':token
        }
    }

    let response = await fetch(`${PUBLIC_BACKEND_URL}${url}`,urlHeader)

    let json;

    if(response.ok){
     json = await response.json();
    }else{
    goto("/error");
    }

    if(json != undefined){
    return { json };
    }else{
    return {json :{status:400,message:'Failed To Send Data !'}}
    }
 }