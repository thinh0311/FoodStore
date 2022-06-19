import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
// import

const StepperInput = ({containerStyle, value=1, onAdd, onMinus}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 50,
                width: 130,
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
                ...containerStyle
            }}
        >
            <TouchableOpacity activeOpacity={0.8}>
                <Icon 
                    style={{
                        color: value > 1 ? COLORS.primary : COLORS.grey,
                    }}
                    size={32}
                    name="remove"
                    onPress={onMinus}
                />
            </TouchableOpacity>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text
                    style={{
                        fontSize: 18,
                    }}
                >
                    {value}
                </Text>
            </View>
                   
            <TouchableOpacity>
                <Icon 
                    style={{
                        color: COLORS.primary,
                    }}
                    size= {32}
                    name="add"
                    onPress={onAdd}
                />
            </TouchableOpacity>
        </View>
    );
};

export default StepperInput;