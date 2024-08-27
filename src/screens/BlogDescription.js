import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Width, colors, fonts } from '../configs/Configs';
import { fontStyles } from '../style/FontsStyle';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
// import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';

const BlogDescription = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute()
    const { item } = route.params
    // console.log('Description', item)
    const { width } = Dimensions.get('window');
    const [blogDetails, setBlogDetails] = useState(null)
    const [blogDescp, setBlogDescp] = useState(null)



    // useEffect(() => {
    //     const get_Blog_Details_byId = async () => {
    //         try {
    //             const res = await axios.post(`https://www.yantramart.com/en/api/App_api/getBlogById?id=${item.id}`);
    //             // console.log('data==========>', res.data.data);
    //             const data = res.data.data
    //             setBlogDetails(data);
    //             if (res.data.data.descp) {
    //                 setBlogDescp(res.data.data.descp)
    //             }
    //         } catch (error) {
    //             console.log('get_Blog_Details_byId fetching error', error);
    //         }
    //     };

    //     get_Blog_Details_byId()
    // }, []);

    const source = {
        html: blogDescp
    };
    // console.log('------------->',blogDescp)

    return (
        <View style={[styles.mainCard, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            // backgroundColor:colors.lightGreen,
            alignItems:'center'
        }]}>
        <WebView source={{ uri: `${item.url}` }} style={{ flex: 1,width:Width*1,paddingHorizontal:10}} />
        </View>
    )
}

export default BlogDescription

const styles = StyleSheet.create({
    mainCard: {
        flex: 1,
        alignItems: 'center'
    },
    containtCard: {

        flex: 1, alignItems: 'center',
        paddingHorizontal: 10
    }
})





// <ScrollView
// showsHorizontalScrollIndicator={false}
// showsVerticalScrollIndicator={false}
// contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10, backgroundColor: colors.lightGreen }}
// >
// <View>
//     <FastImage
//         style={{
//             // flex: 1,
//             height: 300, width: 400,
//             alignSelf: 'center',
//             // backgroundColor: 'gray'
//         }}
//         source={{
//             uri: `${item?.image}`,
//             priority: FastImage.priority.high,

//         }}
//         resizeMode={FastImage.resizeMode.stretch}
//     />
//     <View style={styles.containtCard}>
//         <View style={{ marginTop: 10, width: Width * 1, paddingHorizontal: 10 }}>
//             <Text style={[fontStyles.big_title_text, { color: '#000' }]}>
//                 {blogDetails?.title}
//             </Text>
//         </View>
//         <View style={{ borderBottomWidth: 2, flexDirection: 'row', alignItems: 'center', width: Width * 1, justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 20, borderColor: 'gray' }}>
//             <Text style={[fontStyles.big_title_text, { color: '#000' }]}>
//                 {blogDetails?.author}
//             </Text>
//             <Text style={[fontStyles.big_title_text, { color: '#000' }]}>
//                 {blogDetails?.date}
//             </Text>
//         </View>
//         <View style={{flex:1}}>
//             {/* <Text style={[fontStyles.bigButton_text,{color:'#000'}]}>
//         Description:
//         </Text>
//         <Text style={[fontStyles.bigButton_text,{color:'#000',marginTop:10}]}>
//         {blogDetails?.descp}
//         </Text> */}
//             {/* {blogDescp && <RenderHtml
//                 contentWidth={Width*0.7}
//                 source={source}
//             />} */}


//         </View>
//     </View>

// </View>
// </ScrollView>