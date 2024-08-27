import { ActivityIndicator, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontStyles } from '../style/FontsStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Get_Explore_Deal_Product, Get_New_Collection_Product, Get_Popular_Product } from '../api/service';
import { colors } from '../configs/Configs';




const SearchScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [search, setSearch] = useState('');
    const [allUsersBackup, setAllUsersBackup] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(null)
    const [loading, setloading] = useState(true)
    const thumbs_Image_Url = 'https://yantramart.com/uploads/images/';




    useEffect(() => {
        if (isFocused) {
            // AppSetting.auth_token = '';
            get_popular_product_list();
            // get_new_collection_list();
            // get_explore_product_list();
        }
    }, [isFocused]);
    const get_popular_product_list = async () => {
        setloading(true)
        try {
            const response = await Get_Popular_Product();
            // console.log("get_popular_product_list===>>>", response.data);
            // setFilteredUsers(response.data)
            setAllUsersBackup(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    };



    const searchUser = val => {
        setSearch(val);
        const regex = new RegExp(val, 'i');
        setFilteredUsers(allUsersBackup.filter(it => regex.test(it.unique_id)));
    };



    const renderItem = ({ item }) => {
        // console.log('unique_id----------->',item.unique_id)
        const onItemClick = (item) => {
            const newItemData = {
                image: `${thumbs_Image_Url}${item.featured_img}`,
                unique_id: item.unique_id
            }
            // console.log(newItemData)

            navigation.navigate("NewProductDescriptionscreen", { item: newItemData });
        }
        return (
            <TouchableOpacity
                onPress={() => onItemClick(item)}
                style={styles.listBtnStyle}>
                <View style={styles.btnContaintCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome6
                            size={20} color={'gray'} name={'clock-rotate-left'}
                        />
                        <Text style={[fontStyles.title_text, { color: '#000' }]}>
                            {'  '}{item.unique_id.substring(0, 30)}
                        </Text>
                        {/* <Text style={[fontStyles.title_text, { color: '#000' }]}>
                            {'  '}{ JSON.parse(item.title).en.substring(0, 30)}
                        </Text> */}
                    </View>
                    <Feather
                        size={25} color={'gray'} name={'arrow-up-left'}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.mainCard, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }]}>
            {loading &&
                <Modal
                    // animationType="slide"
                    transparent={true}
                    visible={loading}
                    style={{ flex: 1, }}
                >
                    <View style={{
                        flex: 1,

                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        flexDirection: 'row'

                    }}>
                        <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>
                            Loading...
                        </Text>
                        <ActivityIndicator
                            size={'large'}
                            color={colors.darkGreen}
                        />
                        {/* <Text>
                        loading
                    </Text> */}
                    </View>
                </Modal>


            }
            <>
                <View style={styles.topCard}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtnStyle}>
                        <Ionicons size={45} color={'gray'} name={'chevron-back-outline'} />
                    </TouchableOpacity>
                    <View style={styles.searchBarStyle}>
                        <Image
                            style={{ height: 35, width: 35, tintColor: 'gray' }}
                            source={require('../assets/images/search.png')}
                        />
                        <TextInput
                            placeholder='Search'
                            autoFocus={true}
                            placeholderTextColor={'gray'}
                            selectionColor={'#000'}
                            style={[fontStyles.title_text, styles.inputStyle]}
                            value={search}
                            onChangeText={val => searchUser(val)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, width: '100%', flex: 1, }}>
                    {search.length !== 0
                        &&
                        <FlatList
                            data={filteredUsers}
                            renderItem={renderItem}
                            contentContainerStyle={{ rowGap: 10 }}
                            keyExtractor={item => item.unique_id}
                        />}
                </View>
            </>

        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    mainCard: {
        alignItems: 'center',
        flex: 1
    },
    searchBarStyle: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: 'gray',
        borderRadius: 25,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between',
        flex: 1,
        alignSelf: 'auto'

    },
    inputStyle: {
        paddingHorizontal: '2%',
        fontSize: 16,
        flex: 1,
        lineHeight: 18,
        padding: 2,
        color: '#000'

    },
    topCard: {

        width: '100%',
        // paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '8%',
        paddingRight: '5%',
        marginTop: '5%'
    },
    backBtnStyle: {
        // borderWidth: 1,
        // flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listBtnStyle: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: 'gray',
    },
    btnContaintCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        justifyContent: 'space-between'
    }
})