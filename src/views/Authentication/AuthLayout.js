import React from 'react';
import { View, Text, Image } from 'react-native';
import COLORS from '../../consts/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const AuthLayout = ({title, subtitle, titleContainerStyle, children}) => {
    return (
        <View
            style={{
                flex: 1,
                paddingVertical: 20, 
                backgroundColor: COLORS.white
            }}
        >   
            <KeyboardAwareScrollView 
                // keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    // flex: 1,
                }}
            >
                {/* App Icon */}
                <View 
                    style={{
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >
                    <Image
                        source={require('../../assets/product.png')}
                        resizeMode='contain'
                        style={{height: 100, width: 100}}
                    />
                </View>
                {/* Title & Subtitle */}
                <View
                    style={{marginTop: 20,
                        ...titleContainerStyle
                    }}
                >
                    <Text 
                        style={{
                            textAlign: 'center',
                            color: COLORS.dark,
                            fontWeight: 'bold',
                            fontSize: 24
                        }}>
                        {title}
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        color: COLORS.grey,
                        marginTop: 10,
                        fontSize: 16
                    }}>
                        {subtitle}
                    </Text>
                </View>
                {/* Content / Children */}
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
};
export default AuthLayout;