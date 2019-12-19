package actor

import (
	ipld "github.com/filecoin-project/specs/libraries/ipld"
	util "github.com/filecoin-project/specs/util"
)

var IMPL_FINISH = util.IMPL_FINISH
var TODO = util.TODO

type Serialization = util.Serialization

const (
	MethodSend        = MethodNum(0)
	MethodConstructor = MethodNum(1)

	// TODO: remove this once canonical method numbers are finalized
	MethodPlaceholder = MethodNum(-(1 << 30))
)

func (st *ActorState_I) CID() ipld.CID {
	panic("TODO")
}

func (id *CodeID_I) IsBuiltin() bool {
	switch id.Which() {
	case CodeID_Case_Builtin:
		return true
	default:
		panic("Actor code ID case not supported")
	}
}

func (id *CodeID_I) IsSingleton() bool {
	if !id.IsBuiltin() {
		return false
	}

	for _, a := range []BuiltinActorID{
		BuiltinActorID_Init,
		BuiltinActorID_Cron,
		BuiltinActorID_Init,
		BuiltinActorID_StoragePower,
		BuiltinActorID_StorageMarket,
	} {
		if id.As_Builtin() == a {
			return true
		}
	}

	for _, a := range []BuiltinActorID{
		BuiltinActorID_Account,
		BuiltinActorID_PaymentChannel,
		BuiltinActorID_StorageMiner,
	} {
		if id.As_Builtin() == a {
			return false
		}
	}

	panic("Actor code ID case not supported")
}

func (x ActorSubstateCID) Ref() *ActorSubstateCID {
	return &x
}

func TokenAmount_Placeholder() TokenAmount {
	TODO()
	panic("")
}
