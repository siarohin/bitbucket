/**
 * Auto unsubscribe decorator
 * params {{ string }} the name of the property with Subscription
 * default name is "subscription"
 */
export function AutoUnsubscribe(name: string = "subscription") {
  return constructor => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function() {
      const subscription = this[name];

      if (subscription) {
        subscription.unsubscribe();
      }

      if (original && typeof original === "function") {
        original.apply(this, arguments);
      }
    };
  };
}
