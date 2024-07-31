import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
    Pressable,
    TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { fontStyles } from '../style/FontsStyle'
import { Height, Width, colors } from '../configs/Configs'
import { useNavigation } from '@react-navigation/native'
import LocalStorage from '../utils/LocalStorage'
import Mailer from 'react-native-mail';
import Modal from "react-native-modal";





const SettingScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [reason, setReason] = useState('');




    const logOutHandler = () => {
        Alert.alert('Logout!', 'User will logout from the device.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    LocalStorage.clearAsyncStorage()
                    navigation.navigate('MainTabScreen', { screen: 'Home' })
                }
            },
        ]);
    }

    const backHomeHandler = () => {

        navigation.navigate('MainTabScreen', { screen: 'Home' })

    }
    const deleteHandler = () => {
        setModalVisible(!modalVisible)

    }

    const sumitHandler = () => {

        Alert.alert('Deleting!', 'Once you will submit your account will be deleted parmanentyl.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    // console.error(reason)
                    handleEmail()
                    setModalVisible(!modalVisible)
                    setReason('')
                    //   LocalStorage.clearAsyncStorage()
                    navigation.navigate('MainTabScreen', { screen: 'Home' })
                }
            },
        ]);

    }


    const handleEmail = () => {
        Mailer.mail({
            subject: 'Account Deletion',
            recipients: ['pranavweb@gmail.com'],
            body: reason,
            isHTML: true,
            from: 'abhishek@wartinlabs.com',
        }, (error, event) => {
            if (error) {
                console.error('Email Error: ', error);
                Alert.alert('Error', 'Could not send email');
            } else {
                Alert.alert('Success', 'Email sent successfully');
            }
        });

    };



    return (
        <SafeAreaView style={[styles.container]}>
            <ImageBackground
                source={require("../assets/images/bgauth.png")}
                style={styles.backgroundImage}
                resizeMode="stretch"
            >
                <View style={styles.mainCard}>
                    <View style={{ gap: 20, alignItems: 'center' }}>
                        <Image
                            style={styles.logo}
                            source={require("../assets/images/YantramartLogo.png")}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    fontStyles.heading_2_text,
                                    {
                                        textAlign: "left",
                                        // textTransform: "lowercase",
                                        color: colors.black,
                                        //   lineHeight: 32,
                                        fontWeight: "900",
                                        marginLeft: 0,
                                        letterSpacing: 0.3,
                                        marginTop: 14,
                                    },
                                ]}
                            >
                                {"YANTRA"}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={[
                                    fontStyles.heading_2_text,
                                    {
                                        textAlign: "left",
                                        // textTransform: "lowercase",
                                        color: colors.darkGreen,
                                        //   lineHeight: 32,
                                        fontWeight: "900",
                                        marginLeft: 0,
                                        letterSpacing: 0.3,
                                        marginTop: 14,
                                    },
                                ]}
                            >
                                {"MART"}
                            </Text>
                        </View>
                        <Text
                            numberOfLines={2}
                            style={[
                                fontStyles.big_title_text,
                                {
                                    textAlign: "center",
                                    // textTransform: "lowercase",
                                    color: colors.black,
                                    //   lineHeight: 32,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    letterSpacing: 0.3,
                                    marginTop: 14,
                                },
                            ]}
                        >
                            {
                                "Show the world what you have got, Heavy machine Buy, Sell and Rent"
                            }
                        </Text>

                        <TouchableOpacity
                            onPress={logOutHandler}
                            style={styles.BtnStyle}>
                            <Image
                                style={{ height: 30, width: 30, tintColor: colors.darkGreen, }}
                                resizeMode="contain"
                                source={require('../assets/images/logOut.png')}
                            />
                            <Text style={[fontStyles.big_title_text, { marginLeft: 10, color: '#000' }]}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteHandler}
                            style={styles.BtnStyle}>
                            <Image
                                style={{ height: 30, width: 30, tintColor: colors.darkGreen, }}
                                resizeMode="contain"
                                source={require('../assets/images/delete.png')}
                            />
                            <Text style={[fontStyles.big_title_text, { marginLeft: 10, color: '#000' }]}>
                                Delete Your Account
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={backHomeHandler}
                            style={styles.BtnStyle}>
                            <Image
                                style={{ height: 30, width: 30, tintColor: colors.darkGreen, }}
                                resizeMode="contain"
                                source={require('../assets/images/hometab.png')}
                            />
                            <Text style={[fontStyles.big_title_text, { marginLeft: 10, color: '#000' }]}>
                                Back To Home
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        avoidKeyboard={true}
                        style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', flex: 1,width:Width*1,height:Height*1 }}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            // padding:20,
                            flex: 1,
                            width:Width*1,
                            height:Height*1
                        }}>
                            <View style={styles.modalMainCard}>
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(!modalVisible), setReason('') }}
                                    style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
                                    <Image
                                        style={{ height: 35, width: 35 }}
                                        source={require('../assets/images/close.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={[fontStyles.big_title_text, { color: '#000', textAlign: 'center' }]}>
                                    Please provide the reason for the account deletetion?
                                </Text>
                                <TextInput
                                    multiline={true}
                                    onChangeText={(text) => setReason(text)}
                                    value={reason}
                                    placeholder='Provide the reason ...'
                                    placeholderTextColor={'gray'}
                                    style={[{
                                        borderWidth: 1,
                                        paddingHorizontal: 10,
                                        color: '#000',
                                        width: '100%',
                                        paddingVertical: 10,
                                        marginTop: 20,
                                        borderRadius: 10,
                                        borderColor: 'gray'

                                    }, fontStyles.paragraph_text]}
                                />
                                <Text style={[fontStyles.big_title_text, { color: '#000', textAlign: 'center', marginTop: 20 }]}>
                                    Note:-
                                    <Text style={[fontStyles.paragraph_text, { color: '#000', textAlign: 'center' }]}>
                                        {" Your account will be deleted permanently with in 7 days after submitting."}
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={sumitHandler}
                                    disabled={reason.length === 0}
                                    style={{ marginTop: 20, backgroundColor: reason.length !== 0 ? colors.darkGreen : 'gray', padding: 8, paddingHorizontal: 30, borderRadius: 15 }}>
                                    <Text style={[fontStyles.big_title_text, { color: '#FFF' }]}>
                                        SUBMIT
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: 'center',
        // borderWidth:1
        width: '100%',
        // borderWidth:1
        height: Dimensions.get("window").height,

    },
    backgroundImage: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: "contain",
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    mainCard: {
        // borderWidth: 1,
        // width:'80%',
        height: '50%',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: "contain",
        //   position: "absolute",
        height: 130,
        width: 350,
        // marginTop: 200,
        // marginBottom: 10,
        // marginLeft: 0,
        alignSelf: 'center',
    },
    BtnStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        padding: 5, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', borderRadius: 15, width: '80%'
    },
    modalMainCard: {
        backgroundColor: '#FFF', padding: 20, width: '80%', alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    }
})