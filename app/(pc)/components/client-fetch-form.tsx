"use server";

export async function ClientFetchForm(api_url: string, formData: any) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}${api_url}`, formData);
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;        
    }
}