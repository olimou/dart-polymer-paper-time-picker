@HtmlImport('paper-clock-selector.html')
library polymer_date_picker.paper_clock_selector;

import 'dart:html';
import 'package:web_components/web_components.dart';
import 'package:polymer/polymer.dart';
import 'package:polymer_elements/iron_resizable_behavior.dart';


@CustomElementProxy('paper-clock-selector')
class PaperClockSelector extends HtmlElement with CustomElementProxyMixin {
  PaperClockSelector.created() : super.created();

  factory PaperClockSelector() => new Element.tag('paper-clock-selector');

  DateTime get date => jsElement[r'date'];

  set date(DateTime date) {
    jsElement[r'date'] = date;
  }
}