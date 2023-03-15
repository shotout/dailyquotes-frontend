//
//  QyiteWudget.swift
//  QyiteWudget
//
//  Created by Nagi on 17/02/23.
//

import WidgetKit
import SwiftUI
import Intents

struct WidgetData: Decodable {
  var text: String
  var fontFamily: String
  var fontSize: Double
  var themeBackground: String
  var fontColor: String
  var quoteId: String
}


struct Provider: IntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "Placeholder", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40", fontColor: "#FFFFFF", quoteId: "")
  }

  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date(), configuration: configuration, text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40", fontColor: "#FFFFFF", quoteId: "")
      completion(entry)
  }
  
  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
    let userDefaults = UserDefaults.init(suiteName: "group.widget.quotes")
    if userDefaults != nil {
      let entryDate = Date()
      if let savedData = userDefaults!.value(forKey: "widgetKey") as? String {
        let decoder = JSONDecoder()
        let data = savedData.data(using: .utf8)
        if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
          let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
          let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: parsedData.text, fontFamily: parsedData.fontFamily, fontSize: parsedData.fontSize, themeBackground: parsedData.themeBackground, fontColor: parsedData.fontColor, quoteId: parsedData.quoteId)
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
        } else {
          print("Could not parse data")
        }
      } else {
        let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
        let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40", fontColor: "#FFFFFF", quoteId: "")
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
      }
    }
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationIntent
  let text: String
  let fontFamily: String
  let fontSize: Double
  let themeBackground: String
  let fontColor: String
  let quoteId: String
}

struct QuoteWidgetEntryView : View {
  @Environment(\.widgetFamily) var widgetFamily
  var entry: Provider.Entry
    
  var body: some View {
      let url = URL(string: entry.quoteId)
      switch widgetFamily {
      case .accessoryRectangular:
        VStack {
          Text(entry.text)
            .font(.custom(entry.fontFamily, size: 34, relativeTo: .title))
            .minimumScaleFactor(0.01)
        }
        case .accessoryInline:
        Text(entry.text)
          .font(.custom(entry.fontFamily, size: 34, relativeTo: .title))
          .minimumScaleFactor(0.01)
        default:
            VStack {
              Text(entry.text)
                .foregroundColor(Color(hex: entry.fontColor))
                .font(.custom(entry.fontFamily, size: 34, relativeTo: .title))
                .minimumScaleFactor(0.01)
                .multilineTextAlignment(.center)
            }
            .padding(20)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .edgesIgnoringSafeArea(.all)
            .background(
              Image(entry.themeBackground)
                    .resizable()
                    .scaledToFill()
            )
            .widgetURL(url)
        }
      }
}

struct QuoteWidget: Widget {
  let kind: String = "MyWidget"

  var body: some WidgetConfiguration {
      IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
        QuoteWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("My Widget")
      .description("God tirelessly plays dice under laws which he has himself prescribed.")
      .supportedFamilies([.systemSmall,.systemMedium, .accessoryInline, .accessoryRectangular, .systemLarge])
  }
}

struct QuoteWidget_Previews: PreviewProvider {
  static var previews: some View {
    QuoteWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40",fontColor: "#FFFFFF", quoteId: ""))
          .previewContext(WidgetPreviewContext(family: .systemSmall))
          .previewDisplayName("Small")
    QuoteWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40",fontColor: "#FFFFFF", quoteId: ""))
          .previewContext(WidgetPreviewContext(family: .systemMedium))
          .previewDisplayName("Medium")
    QuoteWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40",fontColor: "#FFFFFF", quoteId: ""))
          .previewContext(WidgetPreviewContext(family: .systemLarge))
          .previewDisplayName("Large")
    QuoteWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40",fontColor: "#FFFFFF", quoteId: ""))
          .previewContext(WidgetPreviewContext(family: .accessoryInline))
          .previewDisplayName("Inline")
    QuoteWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), text: "God tirelessly plays dice under laws which he has himself prescribed.", fontFamily: "Gaegu-Regular", fontSize: 16, themeBackground: "40",fontColor: "#FFFFFF", quoteId: ""))
          .previewContext(WidgetPreviewContext(family: .accessoryRectangular))
          .previewDisplayName("Rectangular")
  }
}
