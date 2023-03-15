//
//  QuoteWidgetExtension.m
//  mooti
//
//  Created by Nagi on 23/02/23.
//
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(QuoteWidgetModule, NSObject)

//RCT_EXTERN_METHOD(setWidgetData:(NSDictionary *))
RCT_EXTERN_METHOD(refreshAllWidgets)

@end
