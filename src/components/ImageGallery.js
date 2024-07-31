import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

const gallery_Url = 'https://yantramart.com/uploads/gallery/';

const ImageGallery = ({ item }) => {
    // console.log('Item:', item); // Log the entire item
    
    const imgobj=JSON.parse(item)
    // console.log(imgobj)
    // console.log(imgobj.length)
    if (!imgobj || !Array.isArray(imgobj)) {
        return <Text>No images available</Text>;
    }
    return (
        <View style={styles.container}>
            {imgobj.map((img, index) => (
                <View style={{flex:1}}>
                     <FastImage
                    key={index}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.image}
                    source={{ 
                        uri: `${gallery_Url}${img}`,
                        priority: FastImage.priority.high,
                         
                }}
                />
                    </View>
            ))}
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1
        backgroundColor: 'rgba(158, 192, 39, 0.4)',
        marginTop:20

    },
    image: {
        height: 300,
        width: 300,
        // marginBottom: 20, // Add spacing between images if needed
        alignSelf: 'center',
        flex:1,
        backgroundColor:'gray'
    },
});

export default ImageGallery;
