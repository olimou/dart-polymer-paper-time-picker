@HtmlImport('paper-time-picker-dialog-style.html')
library polymer_date_picker.paper_time_picker;

import 'dart:html';
import 'package:web_components/web_components.dart';

@CustomElementProxy('paper-time-picker-dialog-style')
class PaperTimePickerDialogStyle extends HtmlElement
    with CustomElementProxyMixin {
  PaperTimePickerDialogStyle.created() : super.created();

  factory PaperTimePickerDialogStyle() =>
      new Element.tag('paper-time-picker-dialog-style');
}