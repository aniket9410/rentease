'use client'

import Container from "../components/container"
import Heading from "../components/heading"
import ListingCard from "../components/listings/listingCard"
import { SafeListing, SafeUser } from "../types"

interface FavoritesClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you favorited!" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient