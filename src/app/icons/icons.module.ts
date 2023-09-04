import {NgModule} from '@angular/core';

import {FeatherModule} from 'angular-feather';
import {
  ArrowDownRight,
  ArrowUpRight,
  Repeat,
  Columns,
  ZoomIn,
  ZoomOut,
  Settings,
  Sliders,
  Users,
  Wifi,
  Search,
  BarChart2,
  Trash,
  Trash2,
  XCircle,
  PlusCircle,
  Plus,
  Save,
  Upload,
  Download,
  X,
  AlertTriangle,
  Headphones,
  Type,
  Archive,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Check,
  ArrowRight,
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ArrowDownRight,
  ArrowUpRight,
  Repeat,
  Columns,
  ZoomIn,
  ZoomOut,
  Settings,
  Sliders,
  Users,
  Wifi,
  Search,
  BarChart2,
  Trash,
  Trash2,
  XCircle,
  PlusCircle,
  Plus,
  Save,
  Upload,
  Download,
  X,
  AlertTriangle,
  Headphones,
  Type,
  Archive,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Check,
  ArrowRight
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule {
}
