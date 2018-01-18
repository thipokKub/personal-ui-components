import './SelectBox/style.css';
import './InputText/style.css';
import './TextArea/style.css';
import './Container/style.css';
import './FileUpload/style.css';
import './ReactSelectWrapper/style.css';

import SelectBoxGenerator from '../Generators/SelectBoxGenerator';
import TextAreaGenerator from '../Generators/TextAreaGenerator';
import InputTextGenerator from '../Generators/InputTextGenerator';
import CardGenerator from '../Generators/CardGenerator';
import FileUploadGenerator from '../Generators/FileUploadGenerator';
import RSelectWG, { RSelectAsyncWG, RSelectCreateableWG, RSelectAsyncCreatablecWG } from '../Generators/ReactSelectWrapperGenerator';
import SimpleCalendarGenerator from '../Generators/SimpleCalendarGenerator';

import Base from '../Base';

const themeName = 'theme-clean';

export default {
    SelectBox: SelectBoxGenerator(themeName),
    TextArea: TextAreaGenerator(themeName),
    InputText: InputTextGenerator(themeName),
    Card: CardGenerator(themeName),
    FileUpload: FileUploadGenerator(themeName),
    Select: RSelectWG(themeName),
    Async: RSelectAsyncWG(themeName),
    Createable: RSelectCreateableWG(themeName),
    AsyncCreateable: RSelectAsyncCreatablecWG(themeName),
    Btn: Base.BtnWrapper(themeName),
    SimpleCalendar: SimpleCalendarGenerator(themeName),
    BlockMath: Base.BlockMath,
    InlineMath: Base.InlineMath
}