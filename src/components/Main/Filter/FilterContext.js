import React, {createContext, PureComponent} from 'react'

export const FilterContext = createContext(null);

export class FilterContextProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.changeFilter = this.changeFilter.bind(this);
        this.state = {
            activeFilter: 'SHOW_ACTIVE',
            changeFilter: this.changeFilter
        };

    }

    changeFilter(filter) {
        this.setState(({activeFilter}) => activeFilter !== filter && ({activeFilter: filter}))
    }

    render() {
        return (
            <FilterContext.Provider value={this.state}>
                {this.props.children}
            </FilterContext.Provider>
        );
    }
}