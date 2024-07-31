import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../configs/Configs'
import { fontStyles } from '../style/FontsStyle'
import SearchBar from './SearchBar'

const TopHeader = ({ notification, wishList, search }) => {
    return (
        <View style={styles.sub_navbar}>
            <Image
                style={styles.logo}
                source={require("../assets/images/logo_symbol.png")}
            />
            {/* <Text
                numberOfLines={1}
                style={[
                    fontStyles.big_title_text,
                    {
                        textAlign: "left",
                        // textTransform: "lowercase",
                        color: colors.black,
                        //   lineHeight: 32,
                        marginLeft: 4,
                        letterSpacing: 0.3,
                    },
                ]}
            >
                {"YANTRAMART"}
            </Text> */}
            <View style={{ flex: 1, }} />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 0.8 }}>
                {search &&
                    <SearchBar placeHolder={false} />
                }
                {notification && <Image
                    style={styles.logo_notification}
                    source={require("../assets/images/notification.png")}
                />}

                {wishList && <Image
                    style={styles.logo_heartIcon}
                    source={require("../assets/images/heart.png")}
                />}
            </View>

        </View>
    )
}

export default TopHeader

const styles = StyleSheet.create({
    sub_navbar: {
        width: "100%",
        height: 49,
        // marginTop: 20,
        justifyContent: "flex-start",
        flexDirection: "row",
        // backgroundColor: Colors.black,
        alignItems: "center",
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: colors.greyTextField,
    },
    logo: {
        resizeMode: "contain",
        height: 100,
        width: 180,
        marginLeft: 10,
        flexDirection: "column",
        alignItems: "center",
    },
    logo_notification: {
        resizeMode: "contain",
        height: 24,
        width: 24,
        marginRight: 14,
        flexDirection: "column",
        alignItems: "center",
    },
    logo_heartIcon: {
        resizeMode: "contain",
        height: 24,
        width: 24,
        marginRight: 20,
        flexDirection: "column",
        alignItems: "center",
    },
})