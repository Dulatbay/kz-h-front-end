export enum TextAlign {
    LEFT= 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

export enum Background {
    PRIMARY = "PRIMARY",
    DEFAULT = "DEFAULT",
    SECONDARY = "SECONDARY",
    TERTIARY = "TERTIARY",
}

export enum Border {
    SOLID = "SOLID",
    DASHED = "DASHED",
    DOTTED = "DOTTED",
    NONE = "NONE",
}

export enum FontColor {
    PRIMARY = "PRIMARY",
    DEFAULT = "DEFAULT",
    SECONDARY = "SECONDARY",
    TERTIARY = "TERTIARY",
}

export enum FontWeight {
    BOLD = "BOLD",
    REGULAR = "REGULAR",
    THIN = "THIN",
}

export enum Icon {
    // Add specific icons here, e.g. HOME = "HOME"
}

export enum FontSize {
    BIG = "BIG",
    MEDIUM = "MEDIUM",
    SMALL = "SMALL",
}

// BaseNode abstract structure
export interface BaseNode {
    nodeType: NodeType;
    background?: Background;
    border?: Border;
    borderRadius?: string;
    opacity?: number;
    padding?: string;
    margin?: string;
}

// Enum for Node Types
export enum NodeType {
    TEXT = "TEXT",
    ICON_TEXT = "ICON_TEXT",
    TITLED_CONTAINER = "TITLED_CONTAINER",
    CENTERED_CONTAINER = "CENTERED_CONTAINER",
    IMAGE = "IMAGE",
    STACK = "STACK",
}

// Specific node types
export interface CenteredContainer extends BaseNode {
    nodeType: NodeType.CENTERED_CONTAINER;
    childNode: BaseNode;
}

export interface IconText extends BaseNode {
    nodeType: NodeType.ICON_TEXT;
    text: Text;
    icon: Icon;
}

export interface Image extends BaseNode {
    nodeType: NodeType.IMAGE;
    width: number;
    height: number;
    url: string;
}

export interface Stack extends BaseNode {
    nodeType: NodeType.STACK;
    vertical: boolean;
    gap: number;
    children: BaseNode[];
}

export interface Text extends BaseNode {
    nodeType: NodeType.TEXT;
    fontSize: FontSize;
    htmltext: string;
    textAlign: TextAlign;
    fontColor: FontColor;
    fontWeight: FontWeight;
}

export interface TitledContainer extends BaseNode {
    nodeType: NodeType.TITLED_CONTAINER;
    text: Text;
    isDivided: boolean;
    content: BaseNode;
}
