@HtmlImport('paper-time-picker.html')
library polymer_date_picker.paper_time_picker;

import 'dart:html';
import 'package:web_components/web_components.dart';
import 'package:polymer/polymer.dart';
import 'package:polymer_elements/iron_resizable_behavior.dart';
import 'package:polymer_elements/iron_media_query.dart';
import 'package:polymer_elements/iron_selector.dart';
import 'package:polymer_elements/iron_flex_layout_classes.dart';
import 'package:polymer_elements/typography.dart';
import 'package:polymer_elements/neon_animated_pages.dart';
import 'package:polymer_elements/neon_animatable.dart';
import 'package:polymer_elements/neon_animation/animations/fade_in_animation.dart';
import 'package:polymer_elements/neon_animation/animations/fade_out_animation.dart';
import 'paper_clock_selector.dart';
import 'paper_time_picker_dialog_style.dart';

@CustomElementProxy('paper-time-picker')
class PaperTimePicker extends HtmlElement with CustomElementProxyMixin {
  PaperTimePicker.created() : super.created();

  factory PaperTimePicker() => new Element.tag('paper-time-picker');
}