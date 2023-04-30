import { useQuery } from "react-query";
import axios from "axios";


export function useGetDog() {
    return useQuery(["getDog"], getDog, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    });
}

export const getDogBreeds = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
    return Object.keys(data.message);
};

export const getDog = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const dogBreeds = await getDogBreeds();
    return {
        nombre: dogBreeds[Math.floor(Math.random() * dogBreeds.length)].substring(0, 6),
        imagen: data.message,
        descripcion: ""
    };
};


// Path: quary\Quary.jsx