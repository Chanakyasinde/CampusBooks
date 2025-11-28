import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

export default function WishListScreen({ navigation }) {
    const [wishlist, setWishlist] = useState([
        {
            id: '3',
            title: 'Design Patterns',
            author: 'Gang of Four',
            category: 'Computer Science',
            condition: 'Good',
            price: 50,
            listingType: 'Sale',
            status: 'Available',
            contact: 'alice@example.com'
        },
        {
            id: '4',
            title: 'Clean Code',
            author: 'Robert Martin',
            category: 'Computer Science',
            condition: 'Like New',
            price: 0,
            listingType: 'Donation',
            status: 'Available',
            contact: 'bob@example.com'
        }
    ]);

    const removeFromWishlist = (bookId) => {
        setWishlist(books => books.filter(b => b.id !== bookId));
    };

    const renderBook = ({ item }) => (
        <View style={styles.bookCard}>
            <TouchableOpacity
                style={styles.bookInfo}
                onPress={() => navigation.navigate('BookDetail', { book: item })}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                <View style={styles.meta}>
                    <Text style={styles.badge}>{item.listingType}</Text>
                    {item.price > 0 && <Text style={styles.price}>₹{item.price}</Text>}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromWishlist(item.id)}
            >
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Wishlist</Text>

            <FlatList
                data={wishlist}
                renderItem={renderBook}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Your wishlist is empty</Text>
                        <Text style={styles.emptySubtext}>
                            Browse books and add your favorites here
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },
    list: {
        paddingBottom: 20,
    },
    bookCard: {
        backgroundColor: COLORS.card,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookInfo: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    badge: {
        fontSize: 12,
        color: COLORS.secondary,
        backgroundColor: COLORS.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.success,
    },
    removeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.danger,
    },
    removeText: {
        color: COLORS.danger,
        fontSize: 14,
        fontWeight: '600',
    },
    empty: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.textLight,
    },
});
