const PROPERTY_LABELS: Record<string, string> = {
    amenity: "Amenity",
    phone: "Phone",
    cuisine: "Cuisine",
    smoking: "Smoking Allowed",
    building: "Building Type",
    addr_city: "City",
    addr_street: "Street",
    addr_country: "Country",
    addr_postcode: "Postcode",
    addr_housenumber: "House Number",
    opening_hours: "Opening Hours",
    diet_halal: "Halal Options",
    diet_vegan: "Vegan Options",
    diet_vegetarian: "Vegetarian Options",
    outdoor_seating: "Outdoor Seating",
    indoor_seating: "Indoor Seating",
    payment_credit_cards: "Credit Cards Accepted",
    payment_debit_cards: "Debit Cards Accepted",
    wheelchair: "Wheelchair Access",
    // add others as needed...
};

export function formatPlaceProperties(properties: Record<string, any>) {
    // Only show keys that have a user-friendly label
    const keysToShow = Object.keys(PROPERTY_LABELS).filter(k => properties[k]);

    return keysToShow.map(key => ({
        label: PROPERTY_LABELS[key] || key,
        value: properties[key],
    }));
}