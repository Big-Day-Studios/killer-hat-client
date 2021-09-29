import React from 'react'
import { TextInput, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'


class TextInputFoolsErrand extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'FoolsErrand': require('../../../assets/fonts/FoolsErrand.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
        
            return (
                <TextInput style={[styles.FoolsErrand, styleProps]} {...allProps}>
                    {this.props.children}
                </TextInput>
            )
    }
}

class TextInputMuseo900 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo900': require('../../../assets/fonts/Museo900-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
                <TextInput style={[styles.Museo900, styleProps]} {...allProps}>
                    {this.props.children}
                </TextInput>
            )
    }
}

class TextInputMuseo700 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo700': require('../../../assets/fonts/Museo700-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
                
                    <TextInput style={[styles.Museo700, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}

class TextInputMuseo500 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo500': require('../../../assets/fonts/Museo500-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
                
                    <TextInput style={[styles.Museo500, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}

class TextInputMuseo300 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo300': require('../../../assets/fonts/Museo300-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
                
                    <TextInput style={[styles.Museo300, styleProps]} {...allProps}
                    ref={input => allProps.inputRef && allProps.inputRef(input)}
                    blurOnSubmit= {allProps.blurOnSubmit}
                    onSubmitEditing = {allProps.onSubmitEditing}
                    returnKeyType = {allProps.returnKeyType}
                    onFocus = {allProps.onFocus}
                    autoCapitalize="none"
                    editable={allProps.editable}
                    onChangeText={allProps.onChangeText}
                    keyboardType={allProps.keyboardType}
                    >
                        {this.props.children} 
                    </TextInput>
                
            )
    }
}

class TextInputMuseo100 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo100': require('../../../assets/fonts/Museo100-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
                
                    <TextInput style={[styles.Museo100, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}


const styles = StyleSheet.create({
    FoolsErrand: {
        fontFamily: 'FoolsErrand'
    },
    Museo900: {
        fontFamily: 'Museo900'
    },
    Museo700: {
        fontFamily: 'Museo700'
    },
    Museo500: {
        fontFamily: 'Museo500'
    },
    Museo300: {
        fontFamily: 'Museo300'
    },
    Museo100: {
        fontFamily: 'Museo100'
    },
})

export { TextInputMuseo100, TextInputMuseo300, TextInputMuseo500, TextInputMuseo700, TextInputMuseo900, TextInputFoolsErrand }