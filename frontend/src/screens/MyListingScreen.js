import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../utils/constants';

export default function MyListingScreen({ navigation }) {
    const [myBooks, setMyBooks] = useState([
        {
            id: '1',
            title: 'Introduction to Algorithms',
            author: 'Cormen, Leiserson',
            category: 'Computer Science',
            condition: 'Good',
            price: 45,
            listingType: 'Sale',
            status: 'Available',
            contact: 'john@example.com'
        },
        {
            id: '2',
            title: 'Database Systems',
            author: 'Ramakrishnan',
            category: 'Computer Science',
            condition: 'Fair',
            price: 30,
            listingType: 'Sale',
            status: 'Sold',
            contact: 'john@example.com'
        }
    ]);

    const toggleStatus = (bookId) => {
        setMyBooks(books =>
            books.map(book =>
                book.id === bookId
                    ? { ...book, status: book.status === 'Available' ? 'Sold' : 'Available' }
                    : book
            )
        );
    };

    const deleteListing = (bookId) => {
        Alert.alert(
            'Delete Listing',
            'Are you sure you want to delete this listing?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => setMyBooks(books => books.filter(b => b.id !== bookId))
                }
            ]
        );
    };

    const renderBook = ({ item }) => (
        <View style={styles.bookCard}>
            <TouchableOpacity
                style={styles.bookInfo}
                onPress={() => navigation.navigate('BookDetail', { book: item })}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                <View style={styles.badges}>
                    <Text style={styles.badge}>{item.listingType}</Text>
                    <Text style={[styles.badge, item.status === 'Available' ? styles.available : styles.sold]}>
                        {item.status}
                    </Text>
                </View>
                {item.price > 0 && <Text style={styles.price}>₹{item.price}</Text>}
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleStatus(item.id)}
                >
                    <Text style={styles.actionText}>
                        {item.status === 'Available' ? 'Mark Sold' : 'Mark Available'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => deleteListing(item.id)}
                >
                    <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>My Listings</Text>
                
            </View>

            <FlatList
                data={myBooks}
                renderItem={renderBook}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No listings yet</Text>
                        <Text style={styles.emptyText}>You can add Listing using 'Add Book' </Text>
                        
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.card,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    list: {
        padding: 16,
    },
    bookCard: {
        backgroundColor: COLORS.card,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    bookInfo: {
        marginBottom: 12,
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
    badges: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    badge: {
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: COLORS.background,
        color: COLORS.text,
    },
    available: {
        color: COLORS.success,
    },
    sold: {
        color: COLORS.danger,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.success,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.danger,
    },
    deleteText: {
        color: COLORS.danger,
    },
    empty: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textLight,
        marginBottom: 20,
    },
    emptyButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    emptyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});
