import React from "react";
import Tile from "./Tile";
import DetailedTile from "./DetailedTile";
import ComponentGallery from "react-component-gallery";
import {Paper, Dialog} from "material-ui";
/**
* Home page component
*/
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedKey: null};
    }
    handleClick(key) {
        this.setState({selectedKey: key});
        this.refs.movieDialog.setState({open: true});
    }
    generateTiles() {
        var tiles = [], movies = this.props.allMovies;
        for (var key in movies) {
            var boundClick = this.handleClick.bind(this,key);
            tiles.push(<Tile movie={movies[key]} onClick={boundClick}></Tile>);
        }
        return tiles;
    }
    render() {
        return (
            <Paper zDepth={0}>
                <Paper zDepth={0}>
                    <Dialog
                        title=""
                        actions={[]}
                        ref="movieDialog"
                        autoDetectWindowHeight={true}>
                        {
                            this.state.selectedKey?(
                                <DetailedTile movie={this.props.allMovies[this.state.selectedKey]} details={true}>
                                    
                                </DetailedTile>
                            ):"Not showing any movie right now"
                        }
                    </Dialog>
                </Paper>
                <ComponentGallery margin={10}
                    widthHeightRatio={4/3}
                    targetWidth={250}
                    initialComponentWidth={250}>
                    {this.generateTiles()}
                </ComponentGallery>
            </Paper>
        );
    }
}
