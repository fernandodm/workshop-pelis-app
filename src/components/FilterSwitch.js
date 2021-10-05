import React from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';

const FilterSwitch = ({name, state, onChange}) => {
    return (
        <View style={styles.filtroContainer}>
            <Text>{name}</Text>
            <Switch
                trackColor={{true: '#2196f3', false: '#778899'}}
                thumbColor={Platform.OS === 'android' ? '#2196f3' : ''}
                value={state}
                onValueChange={onChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    filtroContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
});

export default FilterSwitch;