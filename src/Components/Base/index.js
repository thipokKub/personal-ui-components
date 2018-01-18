import './Btn/style.css';

import BtnGenerator from '../Generators/BtnGenerator';
import { BlockMath, InlineMath } from './react-katex-mod'

const themeBase = 'theme-base';

export default {
    Btn: BtnGenerator(themeBase),
    BtnWrapper: (themeName) => BtnGenerator(`${themeBase} ${themeName}`),
    BlockMath: BlockMath,
    InlineMath: InlineMath
};