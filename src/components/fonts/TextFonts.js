import React from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: componentWillMount']); // Ignore log notification by message
//LogBox.ignoreAllLogs();//Ignore all log notifications

class TextFoolsErrand extends React.Component {
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
               
                    <Text style={[styles.FoolsErrand, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextMuseo900 extends React.Component {
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
               
                    <Text style={[styles.Museo900, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextMuseo700 extends React.Component {
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
               
                    <Text style={[styles.Museo700, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextMuseo500 extends React.Component {
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
               
                    <Text style={[styles.Museo500, styleProps]} {...allProps} >
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextMuseo300 extends React.Component {
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
               
                    <Text style={[styles.Museo300, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextMuseo100 extends React.Component {
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
               
                    <Text style={[styles.Museo100, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
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

export { TextMuseo100, TextMuseo300, TextMuseo500, TextMuseo700, TextMuseo900, TextFoolsErrand }