import { useQuery } from "@tanstack/react-query";
import { PokemonListItem } from "../interfaces/PokemonListItem";
import { BASE_URL } from "../constants/url";

interface Pokemon {
    pokemon: PokemonListItem;
}

interface TypeListInfo {
    pokemon: Pokemon[];
}

const useGetPokemonListByType = (typeName: string) => {
    const {data, isLoading, error} = useQuery<TypeListInfo>({
        queryKey: ["pokemonListByType", typeName],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}type/${typeName}`);
            if(!response.ok){
                throw new Error('La conexion responde que no esta bien');
            }
            return response.json();
        },
    });

    return {
        pokemonList: data?.pokemon ?? [],
        isLoading,
        error: error?.message ?? null,
    };
};

export default useGetPokemonListByType;