import React, {
  useEffect,
  createContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface PaginationContextProps {
  currentPage: number;
  cards: any[];
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
  category: any[] | null;
  setCategory: React.Dispatch<React.SetStateAction<any[] | null>>;
  sort: string | null;
  setSort: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface CardInterface {
  id: number;
  title: string;
  size: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
}

export const PaginationContext = createContext<
  PaginationContextProps | undefined
>(undefined);

export const PaginationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cards, setCards] = useState<any[]>([]);
  const [category, setCategory] = useState<any[] | null>(null);
  const [sort, setSort] = useState<any | null>("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Construir la URL de forma condicional
        let url = `http://localhost:8080/testproductsPaginate?pageNumber=${currentPage}&pageSize=8`;

        if (category !== null) {
          url += `&category=${category}`;
        }

        if (sort !== "") {
          
          url += `&sort=${sort}`;
        }

        console.log("URL:", url);
        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error fetching data from server");
        }

        const data: CardInterface[] = await response.json();
        setCards(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCards();
  }, [currentPage, category, sort]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        cards,
        setCards,
        category,
        setCategory,
        sort,
        setSort,
        setCurrentPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
