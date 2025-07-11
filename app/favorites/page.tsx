import EmptyState from "../components/emptyState";
import ClientOnly from "../components/clientonly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import FavoritesClient from "./favoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Favorites found" subtitle="look like you have no favorites" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ListingPage