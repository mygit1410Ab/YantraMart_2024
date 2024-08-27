import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontStyles } from '../style/FontsStyle'
import { useNavigation } from '@react-navigation/native'

const SearchBar = ({ placeHolder }) => {
    const navigation = useNavigation()
    const serachBarHandler = () => {
        navigation.navigate("SearchScreen");
    }
    return (
        <TouchableOpacity
            onPress={serachBarHandler}
            style={[styles.search_bar_style, { width: placeHolder !== false ? '90%' : null }]}>
            <View style={[styles.mainCard, { borderWidth: placeHolder !== false ? 1 : null, width: placeHolder !== false ? '100%' : '15%', }]}>
                <Image
                    style={{ height: 30, width: 35, tintColor: 'gray' }}
                    source={require('../assets/images/search.png')}
                />
                {placeHolder !== false &&
                    <View style={{ flex: 1, padding: 5 }}>
                        <Text style={[fontStyles.title_text, { color: 'gray' }]}>
                            Search
                        </Text>
                    </View>}
            </View>
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainCard: {

        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        borderColor: 'gray'
    },
    search_bar_style: {
        justifyContent: "flex-start",
        flexDirection: "row",
        // backgroundColor: Colors.black,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 10,
        // borderWidth:1
    },
})


