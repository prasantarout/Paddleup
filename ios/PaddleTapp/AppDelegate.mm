#import "AppDelegate.h"
//#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>

#import "RNGoogleSignin.h"
#import "Orientation.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>


@implementation AppDelegate




- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
     return YES;
   }
  return  [RNGoogleSignin application:application openURL:url options:options];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
  
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [GMSServices provideAPIKey:@"AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI"];
  self.moduleName = @"PaddleTapp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
