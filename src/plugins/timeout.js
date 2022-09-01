/**
 * timeout:
 *   timer: 1000
 *   exec: # deprecated
 *      $: Time is over
 *   onEnd:
 *      $: Time is over
 */
export default function (args) {
    setTimeout(() => {
        this.exec(args.onEnd || args.exec);
    }, args.timer);
}
