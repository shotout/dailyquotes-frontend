//
//  QuoteWidgetModule.swift
//  mooti
//
//  Created by Nagi on 23/02/23.
//
import Foundation
import WidgetKit

@objc(QuoteWidgetModule)
class QuoteWidgetModule: NSObject {
  
  @objc(refreshAllWidgets)
  func refreshAllWidgets() {
    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadAllTimelines()
    }
  }
}
