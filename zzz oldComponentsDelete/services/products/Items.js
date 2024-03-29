import React from "react"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import styled from "styled-components"
import {useRouter} from "next/router"
import Item from "./Item"
import {Center} from "../styles"
import Error from "./Error"
import Pagination from "./Pagination"

const READ_ITEMS_QUERY = gql`
    query READ_ITEMS_QUERY(
        $skip: Int = 0
        $first: Int = ${process.env.pagination.perPage}
    ) {
        items(
            skip: $skip,
            first: $first,
            orderBy: createdAt_ASC,
        ) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`
const READ_ITEMS_QUERY2 = gql`
query MyQuery {
  posts {
      nodes{
        id
        slug
        title
        content
        featuredImage {
          id
          mediaItemUrl
        }
      }
    }
}
`

const ItemList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 60px;
    max-width: ${({theme}) => theme.maxWidth};
    margin: 0 auto;
`

const Items = () => {
    const router = useRouter()
    const {page} = router.query || 1

    const {loading, error, data} = useQuery(READ_ITEMS_QUERY2, { 
        
        //variables: {skip: process.env.pagination.perPage * (page - 1)},
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <Error error={error} />
    }

    const {items} = data

    return (
        <Center>
            <ItemList>
                {data.posts.nodes.map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </ItemList>
        </Center>
    )
}

export default Items
export {READ_ITEMS_QUERY}
