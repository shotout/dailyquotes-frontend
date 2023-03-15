//
//  QuoteWidgetBundle.swift
//  QuoteWidget
//
//  Created by Nagi on 23/02/23.
//

import WidgetKit
import SwiftUI

@main
struct QuoteWidgetBundle: WidgetBundle {
    var body: some Widget {
        QuoteWidget()
        QuoteWidgetLiveActivity()
    }
}
