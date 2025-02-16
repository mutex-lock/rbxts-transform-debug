import ts, { factory } from "typescript";
import { TransformState } from "../../../class/transformState";
import { createDebugPrefixLiteral, createErrorPrefixLiteral } from "../../../util/shared";
import { CallMacro } from "../macro";

export const PrintMacro: CallMacro = {
	getSymbol(state: TransformState) {
		return state.symbolProvider.moduleFile!.get("$print");
	},
	transform(state: TransformState, node: ts.CallExpression) {
		const { enabled } = state.config;

		return enabled
			? factory.updateCallExpression(node, factory.createIdentifier("print"), undefined, [
					createDebugPrefixLiteral(node),
					...node.arguments,
				])
			: factory.createVoidExpression(factory.createIdentifier("undefined"));
	},
};

export const WarnMacro: CallMacro = {
	getSymbol(state: TransformState) {
		return state.symbolProvider.moduleFile!.get("$warn");
	},
	transform(state: TransformState, node: ts.CallExpression) {
		const { enabled } = state.config;

		return enabled
			? factory.updateCallExpression(node, factory.createIdentifier("warn"), undefined, [
					createDebugPrefixLiteral(node),
					...node.arguments,
				])
			: factory.createVoidExpression(factory.createIdentifier("undefined"));
	},
};

export const ErrorMacro: CallMacro = {
	getSymbol(state: TransformState) {
		return state.symbolProvider.moduleFile!.get("$error");
	},
	transform(state: TransformState, node: ts.CallExpression) {
		const { enabled } = state.config;

		return enabled
			? factory.updateCallExpression(node, factory.createIdentifier("error"), undefined, [
					createErrorPrefixLiteral(node),
					...node.arguments.slice(1),
				])
			: factory.createVoidExpression(factory.createIdentifier("undefined"));
	},
};
